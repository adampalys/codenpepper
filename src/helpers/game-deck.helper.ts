export const reduceToWinner = <T extends { crew: number }>(arr: [number, T][]) => (
    arr.reduce((acc, curr) => {

        const last = acc[acc.length - 1];

        if (!last) {
            return [curr];
        }

        const [accPlayer, accCard] = last;
        const [currPlayer, currCard] = curr;


        if (accCard.crew === currCard.crew) {
            return [...acc, curr]
        }

        return accCard.crew > currCard.crew ? [...acc] : [curr]
    }, [] as Array<[number, T]>)
);
