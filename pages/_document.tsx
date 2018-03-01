import Document, { Head, Main, NextScript } from 'next/document';
import conf from '../src/conf';

export default class MyDocument extends Document {
  public static getInitialProps({ renderPage }: any) {
    const props = renderPage();
    const confString = conf.toBase64();
    return { ...props, confString };
  }

  public render() {
    return (
      <html>
        <Head>
          <meta id="conf" content={this.props.confString} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
