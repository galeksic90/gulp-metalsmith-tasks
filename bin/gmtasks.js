#!/usr/bin/env node

process.stdout.write("gunmetal v1.1.3\r");
process.env.GULP_PROJECTS_DIR = process.cwd();
process.chdir(require('gunmetal').dirname);
require('gulp-cli')();
