import membersData from "./membersData";

const extractNumbers = (input: string) => {
  const en_numbersRegex =
    /(zero)|(one|واحد)|(two|اثنان|اثنين)|(three|ثلاث[ه|ة]?)|(four|أربع[ه|ة]?)|(five|خمس[ه|ة]?)|(six|ست[ه|ة]?)|(seven|سبع[ه|ة]?)|(eight|ثماني[ه|ة]?)|(nine|تسع[ه|ة]?)|(ten|عشر[ه|ة]?)/gm;
  let match: Array<string | undefined | "index"> | null | any;
  let inputTokens = input.split(" ");
  while ((match = en_numbersRegex.exec(input)) !== null) {
    match.shift();
    let theNum: string | undefined;
    let theWord: string | undefined;
    for (let i in match) {
      if (match[i] !== undefined) {
        theNum = i;
        theWord = match[i];
        break;
      }
    }
    if (!theNum || !theWord) break;
    const indexToRemove = match.index;
    let endIndex = indexToRemove + theWord.length;
    let word = input.substring(indexToRemove, endIndex);
    let wordIndex = inputTokens.indexOf(word);
    inputTokens[wordIndex] = theNum?.toString();
    input = inputTokens.join(" ");
  }
  return input;
};

// console.log(extractNumbers(input));
// output: 1 tickets 1 kids 3 and 5 five
// By Azzam Faraj

const run = (text: string) => {
  const members = {
    adults: 0,
    children: 0,
    disabled: 0,
  };
  const tokenizedText = text.split(" ");
  for (var i = 0; i < tokenizedText.length; i++) {
    const word = tokenizedText[i];
    if (isNaN(parseInt(word)) && tokenizedText[i + 1] !== "for") {
      if (word === "for") {
        const ammountNum = !isNaN(parseInt(tokenizedText[i - 1]))
          ? parseInt(tokenizedText[i - 1])
          : !isNaN(parseInt(tokenizedText[i - 2]))
          ? parseInt(tokenizedText[i - 2])
          : 0;
        const type = tokenizedText[i + 1];
        for (var e = 0; e < membersData.length; e++) {
          const record = membersData[e];
          if (type?.includes(record.word)) {
            members[record.type as keyof typeof members] = ammountNum;
          }
        }
      } else if (
        tokenizedText[i + 1] !== "for" ||
        tokenizedText[i + 2] !== "for"
      ) {
        for (var e = 0; e < membersData.length; e++) {
          const record = membersData[e];
          if (word?.includes(record.word)) {
            const count = isNaN(parseInt(tokenizedText[i - 1]))
              ? 0
              : parseInt(tokenizedText[i - 1]);
            if (members[record.type as keyof typeof members] === 0) {
              members[record.type as keyof typeof members] =
                count || record.count;
            }
          } else if (!isNaN(parseInt(word))) {
            const count = parseInt(word);
            members.adults = count;
          }
        }
      }
    }
  
  }
  return members;
};

console.log("-----------------");
console.log("-----------------");
console.log("-----------------");
let input = " two for children and one for an adult";
console.log(input);
console.log(run(extractNumbers(input)));
console.log("-----------------");
let input11 = " two for children ";
console.log(input11);
console.log(run(extractNumbers(input11)));
console.log("-----------------");
let input2 = " تذكرتين";
console.log(input2);
console.log(run(extractNumbers(input2)));
console.log("-----------------");
let input3 = " تذكرة واحدة";
console.log(input3);
console.log(run(extractNumbers(input3)));
console.log("-----------------");
let input4 = "تذاكز";
console.log(input4);
console.log(run(extractNumbers(input4)));
console.log("-----------------");