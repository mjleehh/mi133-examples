const versionString = `
version: ${VERSION}
commit: ${COMMITHASH}
branch: ${BRANCH}
`

export default function printVersion() {
    console.log(versionString)
}
