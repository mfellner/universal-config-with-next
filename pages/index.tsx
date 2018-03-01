import * as React from 'react';
import fetch from 'isomorphic-unfetch';
import conf from '../src/conf';
import log from '../src/log';

type Props = { initialState: State };
type State = { pokemon: any[]; next: string; isLoading?: boolean };

const styles: { [name: string]: React.CSSProperties } = {
  ul: {
    display: 'flex',
    flexFlow: 'wrap',
    listStyle: 'none',
    padding: 0
  },
  li: {
    flex: '1 0 25%'
  }
};

export default class Index extends React.PureComponent<Props, State> {
  public readonly state: State;

  public static async getInitialProps(): Promise<Props> {
    log.debug('fetch initial list of pokemon…');
    const backendURL = conf.getString('backendURL')!;
    const index = await fetch(backendURL).then(r => r.json());
    const { results, next } = await fetch(index.pokemon).then(r => r.json());
    return { initialState: { pokemon: results, next } };
  }

  constructor(props: Props) {
    super(props);
    this.state = props.initialState;
  }

  private fetchMorePokemon = async () => {
    log.debug('fetch more pokemon…');
    this.setState({ isLoading: true });
    const { results, next } = await fetch(this.state.next).then(r => r.json());
    this.setState(prevState => ({
      isLoading: false,
      pokemon: [...prevState.pokemon, ...results],
      next
    }));
  };

  public render() {
    const { pokemon, isLoading } = this.state;
    return (
      <main>
        <h1>Pokémon</h1>
        <ul style={styles.ul}>
          {pokemon.map((p, i) => (
            <li key={i} style={styles.li}>
              {p.name}
            </li>
          ))}
        </ul>
        <button onClick={this.fetchMorePokemon} disabled={isLoading}>
          {isLoading ? 'loading…' : 'load more!'}
        </button>
      </main>
    );
  }
}
