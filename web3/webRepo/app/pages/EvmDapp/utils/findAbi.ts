const findAbi = (
  abi: any[],
  { name, type = 'function' }: { name: string; type: 'function' | 'event' | 'error' }
) => {
  return [abi.find((item: any) => item.name === name && item.type === type)]
}

export default findAbi
