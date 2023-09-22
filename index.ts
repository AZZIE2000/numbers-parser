let input = "is one tickets واحد kids ثلاث and خمس five";
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

console.log(extractNumbers(input));
// output: 1 tickets 1 kids 3 and 5 five
// By Azzam Faraj