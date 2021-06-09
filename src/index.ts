import * as core from '@actions/core'
import * as io from '@actions/io';
import * as exec from '@actions/exec';
import * as tc from '@actions/tool-cache';

const version = "1.0.0"
const os = "linux"

const run = async () => {
    try {
        core.debug('Begin Bazelisk Action');
        const version = core.getInput('version', { required : true});
        //const os = core.getInput('os', { required : true , default: "linux"});
        //await exec.exec('npm install -g bazelisk');
        const bazeliskPath = await tc.downloadTool(`https://github.com/summerlabs/punic/releases/download/${version}/punic.tar.gz`);
        const punicBinPath = "bin"
        core.debug('Successfully downloaded binary to bazeliskPath');
        await io.mkdirP(punicBinPath);
        await io.mv(bazeliskPath, `${punicBinPath}/punic`);
        await exec.exec('chmod', ['+x', `${punicBinPath}/punic`]);
        await core.addPath(`${punicBinPath}`);
    } catch(error) {
        core.setFailed(error.message)
    }
}


run()
