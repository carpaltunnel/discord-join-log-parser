const Constants = require('./lib/constants');
const fs = require('fs');
const argv = require('yargs')
    .option('logfile', {
      alias: 'f',
    })
    .option('ban-generate', {
      alias: 'b',
    })
    // TODO : Implement this
    .options('line-delimiter', {
      alias: 'd',
    })
    .options('print-json', {
      alias: 'p',
    })
    .options('generate-stats', {
      alias: 's',
    })
    .argv;

if (!argv.logfile) {
  console.error('Error : No log file specified, nothing to do.  Exiting...');
  process.exit(-1);
}

if(!fs.existsSync(argv.logfile)) {
  console.error(`Error : Log file ${argv.logfile} does not exist.  Exiting...`);
  process.exit(-1);
}


//TODO : Use line delimiter from parameters
const logs = fs.readFileSync(argv.logfile, { encoding: 'utf8', flag: 'r' }).split('\n');

const results = [];
let event = {};
let inEvent = false;
logs.forEach((line) => {
  // Skip separators / useless lines
  if (line === ' — ' || line.slice(0, 5) === 'Today' || line === '') {
    return;
  }

  // Only care about joins, ignore leaves
  if (line.slice(0, 6) === Constants.EVENT_START && !line.match(Constants.MEMBER_LEFT_REGEX)) {
    inEvent = true;
    return;
  }

  // All data aggregation is done in an active event
  if (inEvent) {
    // Check event type
    if (line.slice(0,6) === 'Member') {
      event.type = line.match(Constants.MEMBER_JOINED_REGEX) ? Constants.EVENT_TYPES.JOIN : Constants.EVENT_TYPES.LEAVE;
    }

    // Get username
    if ((line.slice(0,1) === '@' || line.slice(0,3) === '<@!') && line !== '@Member') {
      event.username = line.slice(line.indexOf(' ') + 1);
      return;
    }

    // Get account age
    if (line.match(Constants.ACCOUNT_AGE_REGEX) || line.match(Constants.ACCOUNT_AGE_YEARS_REGEX)) {
      event.accountAgeString = line;

      //TODO : parse age into useful format
      return;
    }

    // TODO : Ignore accounts older than one year
    // TODO : Ignore accounts older than one year
    // TODO : Ignore accounts older than one year
    // TODO : Ignore accounts older than one year



    // End of event (and userId/event date)
    if (line.slice(0, 3) === 'ID:') {
      event.userId = line.slice(line.indexOf(' '), line.indexOf('•'));
      event.time = line.slice(line.indexOf('at ') + 3);

      inEvent = false;
      results.push(Object.assign({}, event));
      event = {};
    }
  }
});

if (argv['print-json']) {
  console.log(JSON.stringify(results, 0, 2));
}

if (argv['generate-stats']) {
  console.log(`\n\n----------------------- Stats -----------------------`);
  console.log(`\t Log Lines Analyzed : ${logs.length}`);
  console.log(`\t Bans Generated : ${results.length}`);

  console.log(`\n\n----------------------- Account Summary -----------------------`);
  console.log('\tUSERNAME  |  USERID  |  EVENT TIME  |  ACCOUNT AGE');
  results.forEach((event) => {
    console.log(`\t${event.username} | ${event.userId} | ${event.time} | ${event.accountAgeString}`);
  });
}


if (argv['ban-generate']) {
  console.log(`\n\n----------------------- Generated Ban Log (${results.length} bans)-----------------------`);
  results.forEach((event) => {
    console.log(`?ban @${event.username} automated ban list for raid bots`);
  });
}

