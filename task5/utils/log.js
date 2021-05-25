export const logMethodError = (funcName, args, err) => {
    console.log(`"${err?.message}" occurs in ${funcName}(${args.map((arg) => JSON.stringify(arg)).join(',')})
`);
};
