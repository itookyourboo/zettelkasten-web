const STUB = [
    {
        id: '8xb14n',
        title: "Projects",
        description: "My ideas, plans and developments"
    },
    {
        id: 'p01ew8',
        title: "The second brain",
        description: "All my knowledge in the box"
    },
    {
        id: 'oy62xl',
        title: "Hard skills",
        description: "Professional growing up"
    },
    {
        id: 'k261hd',
        title: "Study",
        description: "Lecture notes, research works"
    }
]

function getZettelkastenList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(STUB);
        }, 1000);
    })
}

export default getZettelkastenList;
