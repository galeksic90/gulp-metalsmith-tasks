#!/usr/bin/env node

process.stdout.write("gulp-metalsmith-tasks v1.0\r");
process.env.GULP_PROJECTS_DIR = process.cwd();
process.chdir(require('gulp-metalsmith-tasks').dirname);
require('gulp-cli')();
