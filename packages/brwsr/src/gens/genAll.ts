import {TypPrj} from '@/ctxs/CtxGlb'
import {genFileApp} from '@/gens/genFileApp'
import {genFileGit} from '@/gens/genFileGit'
import {genFileHyp} from '@/gens/genFileHyp'
import {genFileIdx} from '@/gens/genFileIdx'
import {genFilePkg} from '@/gens/genFilePkg'
import {genFileTsc} from '@/gens/genFileTsc'
import {genFileVite} from '@/gens/genFileVite'
/**
 *
 */
export const genAll = async (prj: TypPrj) => {
  if (!window.brdg) throw new Error('Failed to load the window bridge.')
  const saveFile = window.brdg.saveFile
  await saveFile(prj.fldrPth + '/index.html', genFileHyp())
  await saveFile(prj.fldrPth + '/package.json', genFilePkg())
  await saveFile(prj.fldrPth + '/tsconfig.json', genFileTsc())
  await saveFile(prj.fldrPth + '/.gitignore', genFileGit())
  await saveFile(prj.fldrPth + '/vite.config.ts', genFileVite())
  await saveFile(prj.fldrPth + '/src/index.ts', genFileIdx())
  await saveFile(prj.fldrPth + '/src/cmps/CmpApp.ts', genFileApp(prj))
  alert('Code saved at: ' + prj.fldrPth)
}
