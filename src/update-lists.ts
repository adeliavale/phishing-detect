import {
  metamask,
  polkadot,
  cryptoscamdb,
  phishfort,
} from "@src/list-handlers";
import { writeFileSync } from "fs";

Promise.all([metamask(), polkadot(), cryptoscamdb(), phishfort()]).then(
  (lists: ListDownloader[]) => {
    const allLists: ListDownloader = {
      whitelist: [],
      blacklist: [],
      fuzzylist: [],
    };
    lists.forEach((list) => {
      allLists.blacklist = allLists.blacklist.concat(list.blacklist);
      allLists.whitelist = allLists.whitelist.concat(list.whitelist);
      allLists.fuzzylist = allLists.fuzzylist.concat(list.fuzzylist);
    });
    allLists.blacklist = Array.from(new Set(allLists.blacklist));
    allLists.fuzzylist = Array.from(new Set(allLists.fuzzylist));
    allLists.whitelist = Array.from(new Set(allLists.whitelist));
    writeFileSync("./dist/lists/all.json", JSON.stringify(allLists));
    writeFileSync(
      "./dist/lists/whitelist.json",
      JSON.stringify(allLists.whitelist)
    );
    writeFileSync(
      "./dist/lists/blacklist.json",
      JSON.stringify(allLists.blacklist)
    );
    writeFileSync(
      "./dist/lists/fuzzylist.json",
      JSON.stringify(allLists.fuzzylist)
    );
  }
);
