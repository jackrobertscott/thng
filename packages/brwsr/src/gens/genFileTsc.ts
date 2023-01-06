/**
 *
 */
export const genFileTsc = () => {
  const data = {
    compilerOptions: {
      noEmit: true,
      strict: true,
      allowJs: false,
      skipLibCheck: false,
      isolatedModules: true,
      esModuleInterop: false,
      resolveJsonModule: true,
      useDefineForClassFields: true,
      allowSyntheticDefaultImports: true,
      forceConsistentCasingInFileNames: true,
      lib: ['DOM', 'DOM.Iterable', 'ESNext'],
      moduleResolution: 'Node',
      module: 'ESNext',
      target: 'ESNext',
      baseUrl: '.',
      paths: {
        '@/*': ['src/*'],
      },
    },
    include: ['src/**/*.ts'],
    exclude: ['node_modules'],
  }
  return JSON.stringify(data, null, 2)
}
