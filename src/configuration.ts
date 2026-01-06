import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import { readFileSync } from 'node:fs';
import * as path from 'node:path';
// 读取配置默认配置文件名称
const YAML_CONFIG_FILENAME_DEFAULT = 'env.yml';
const YAML_FILE_PATH_DEFAULT = path.resolve(
  __dirname,
  '../config',
  YAML_CONFIG_FILENAME_DEFAULT,
);
//读取当前运行环境配置文件
const env = process.env.NODE_ENV;
// console.log('print ~  process.env:', process.env);
// console.log('print ~ env:', env);
const YAML_FILE_PATH_ENV = path.resolve(
  __dirname,
  '../config',
  `env.${env}.yml`,
);

const comonConfig = yaml.load(readFileSync(YAML_FILE_PATH_DEFAULT, 'utf8'));
const envConfig = yaml.load(readFileSync(YAML_FILE_PATH_ENV, 'utf8'));

export default (): any => _.merge(comonConfig, envConfig);
