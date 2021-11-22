import { RepoInfoType, ProblemInfoType } from './info';

export default interface ExternalType {
  content: string;
  link: string;
  info?: RepoInfoType | ProblemInfoType;
  type: 'github' | 'tistory' | 'velog' | 'algorithm';
  identity: string;
  target: string;
}
