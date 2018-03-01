import TypeConf from 'typeconf';

export default new TypeConf()
  .withFile(process.cwd() + '/conf.yaml')
  .withDOMNode('conf')
  .withEnv('app');
