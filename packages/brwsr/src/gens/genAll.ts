import {GenApp} from '@/gens/genFileApp'
import {GenGit} from '@/gens/genFileGit'
import {GenHyp} from '@/gens/genFileHyp'
import {GenIdx} from '@/gens/genFileIdx'
import {GenPkg} from '@/gens/genFilePkg'
import {GenTsc} from '@/gens/genFileTsc'
import {GenVite} from '@/gens/genFileVite'
/**
 *
 */
export const genAll = async (fldr: string) => {
  if (!window.brdg) throw new Error('Failed to load the window bridge.')
  const saveFile = window.brdg.saveFile
  await saveFile(fldr + '/index.html', GenHyp())
  await saveFile(fldr + '/package.json', GenPkg())
  await saveFile(fldr + '/tsconfig.json', GenTsc())
  await saveFile(fldr + '/.gitignore', GenGit())
  await saveFile(fldr + '/vite.config.ts', GenVite())
  await saveFile(fldr + '/src/index.ts', GenIdx())
  await saveFile(fldr + '/src/cmps/CmpApp.ts', GenApp())
  alert('code generated')
}
