'use strict';
var exec = require('child_process').exec,
    child;
exports.name = 'install';
exports.usage = '[options] name[@version]';
exports.desc = 'install component modules, default from http://spmjs.io,use $ spm config set registry http://[custom uri] ';
exports.register = function (commander){
    commander
        .option('-r, --registry <url>', 'registry url of yuan server', String)
        .option('-I, --input-directory <dir>',  'input directory, default: current working directory', String)
        .option('-O, --output-directory <dir>',  'output directory, default: spm_modules', String)
        .option('-f, --force', 'force to download a unstable module', Boolean)
        .option('-q, --quiet', 'show less logs', Boolean)
        .option('-S, --save','save dependencies to package.json', Boolean)
        .option('-SD, --save-dev','save devDependencies to package.json', Boolean)
        .option('--verbose','show more logs', Boolean)
        .option('--no-color','disable colorful print', Boolean)
        .on('--help', function(){
            console.log('   Examples:'.blue.bold);
            console.log('');
            console.log('   $ '+'wn install'.blue.bold+' jquery');
            console.log('   $ '+'wn install'.blue.bold+' jquery arale-class');
            console.log('   $ '+'wn install'.blue.bold+' jquery@1.8.2');
            console.log('   $ '+'wn install'.blue.bold+' underscore --save');
            console.log('');
        })
        .action(function () {
             var argsStr=getArgsStr();
//            var args = parseArgs(arguments);
//            console.log(args);
            child = exec('spm install '+argsStr,
                function (error, stdout, stderr) {
                    console.log('install: ' + stdout);
                    console.log(stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            function getArgsStr(){
                var str='';
                for(var i=0;i<process.argv.length;i++){
                    if(i>2){
                        str+=process.argv[i]+' ';
                    }else if(i==process.argv.length-1){
                        str+=process.argv[i];
                    }
                }
                return str;
            }
            function parseArgs(args){
                var str={args:'',options:{}};
                for(var i in args){
                    if(typeof args[i] == 'string'){
                        str.args+=args[i]+' ';
                    }else if(typeof args[i] == 'object'){
                        str.options=args[i];
                    }
                }
                return str;
            }
            //console.log(options);
//            if (options.clean) Installer.clean();
//
//            if (repo) {
//                args = repo.split('@');
//                if (options.save) args.push(true);
//            } else {
//                args = [];
//            }
//            args.push(function (err) {
//                if (err) util.fatal(err);
//            });
//            installer.install.apply(installer, args);
        });
};