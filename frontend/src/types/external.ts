export default interface ExternalType {
  content: string;
  link: string;
  info?: object;
  type: 'github' | 'tistory' | 'velog' | 'algorithm';
  identity: string;
  target: string;
}
