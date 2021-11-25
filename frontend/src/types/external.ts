import { RepoInfoType, ProblemInfoType } from './info';

export default interface ExternalType {
  title?: string;
  content?: string;
  link: string;
  info?: RepoInfoType | ProblemInfoType;
  type: 'repository' | 'tistory' | 'velog' | 'problem';
  identity?: string;
  target?: string;
}
