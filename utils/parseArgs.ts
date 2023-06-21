const getTSfileName = (arg: string): string => {
  const tsFileStr = arg.split('/');
  const tsIndex = tsFileStr.length - 1;
  const tsFile = arg.split('/')[tsIndex];
  return tsFile;
}

const parseArgs = (args: string[]) => {
    const tsFile = getTSfileName(args[1]);
    console.log(tsFile);
}

export default parseArgs;