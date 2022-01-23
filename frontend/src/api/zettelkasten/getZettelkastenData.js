const STUB = [
    {
        zettelkasten: {
            id: "8xb14n",
            title: "Projects",
            description: "My ideas, plans and developments",
            rights: {
                can_read: true,
                can_edit: true,
                can_delete: true
            },
        },
        folders: {
            "Inbox": {
                zettels: [
                    {
                        id: "12ds81",
                        title: "Free hosting services to deploy",
                    },
                    {
                        id: "dys12d",
                        title: "Color scheme"
                    }
                ]
            },
            "Zettelkasten-Web": {
                zettels: [
                    {
                        id: "92jdk1",
                        title: "Synchronization with Google Drive"
                    },
                    {
                        id: "1283ds",
                        title: "Zettel structure"
                    },
                    {
                        id: "q2a3ds",
                        title: "Access rights System"
                    },
                    {
                        id: "2kd91c",
                        title: "Database scheme"
                    }
                ],
            },
            "Coffee Shop": {
                zettels: [
                    {
                        id: "12hdws7",
                        title: "Barista courses"
                    },
                    {
                        id: "kdjn21",
                        title: "Friends in the coffee industry"
                    },
                    {
                        id: "ilq2jn",
                        title: "Coffee suppliers"
                    },
                ]
            }
        }
    }
]

function getZettelkastenData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject("Some error");
            resolve(STUB);
        }, 3000);
    })
}

export default getZettelkastenData;
