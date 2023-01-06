/**
 *
 */
export const genFileGit = () => {
  const fileArr = [
    '.DS_Store',
    '*.local',
    '*.log*',
    '*.env*',
    '!.env.example',
    'package-lock.json',
    'yarn.lock',
    'node_modules',
    'coverage',
    'build',
    'dist',
    'lib',
    '.docz',
    '.cache',
    '.vercel',
    '.vscode',
    '.yarn',
  ]
  return fileArr.join('\n')
}
