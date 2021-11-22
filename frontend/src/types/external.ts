import { RepoInfo, ProblemInfo } from './info';

export default interface ExternalType {
  content: string;
  link: string;
  info?: RepoInfo | ProblemInfo;
  type: 'github' | 'tistory' | 'velog' | 'algorithm';
  identity: string;
  target: string;
}
