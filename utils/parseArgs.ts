const parseArgs = (args: string[]) => {
  console.log(args);
  const tsFile = args[1].split('/');
  const tsIndex = tsFile.length - 1;
  console.log(tsIndex);
  console.log(tsFile);
  console.log(tsFile[tsIndex]);
}

export default parseArgs;