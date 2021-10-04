let inc=0
let id = () => ++inc;
let rating = () => Math.floor((Math.random() * 5) + 1);
let time = () => new Date(new Date().getTime() + Math.random() * 1000000000).toISOString()

function makeText(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOP QRSTUVWXYZabcdef g h i j klmn opqrstuvwxyz0123456789 ";

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
module.exports = {
    blogs: [{
            id: id(),
            title: makeText(5).trim(),
            post: makeText(100).trim(),
            name: makeText(5).trim(),
            url: 'http://asdasd.com',
            categories: [
                'Culture'
            ],
            comments: [{
                    name: makeText(5).trim(),
                    comment: makeText(15).trim(),
                    time: time(),
                    rating: rating()
                },
                {
                    name: makeText(5).trim(),
                    comment: makeText(15).trim(),
                    time: time(),
                    rating: rating()
                },
            ],
            time: time()
        },
        {
            id: id(),
            title: makeText(5).trim(),
            post: makeText(100).trim(),
            name: makeText(5).trim(),
            url: 'http://asdasd.com',
            categories: [
                'Music'
            ],
            comments: [{
                    name: makeText(5).trim(),
                    comment: makeText(15).trim(),
                    time: time(),
                    rating: rating()
                },
                {
                    name: makeText(5).trim(),
                    comment: makeText(15).trim(),
                    time: time(),
                    rating: rating()
                },
            ],
            time: time()
        },
        {
            id: id(),
            title: makeText(5).trim(),
            post: makeText(100).trim(),
            name: makeText(5).trim(),
            url: 'http://asdasd.com',
            categories: [
                'Tech',
                
            ],
            comments: [{
                    name: makeText(5).trim(),
                    comment: makeText(15).trim(),
                    time: time(),
                    rating: rating()
                },
                {
                    name: makeText(5).trim(),
                    comment: makeText(15).trim(),
                    time: time(),
                    rating: rating()
                },
            ],
            time: time()
        },
        {
            id: id(),
            title: makeText(5).trim(),
            post: makeText(100).trim(),
            name: makeText(5).trim(),
            url: 'http://asdasd.com',
            categories: [
                'Tech',
                'Health'
            ],
            comments: [{
                    name: makeText(5).trim(),
                    comment: makeText(15).trim(),
                    time: time(),
                    rating: rating()
                },
                {
                    name: makeText(5).trim(),
                    comment: makeText(15).trim(),
                    time: time(),
                    rating: rating()
                },
            ],
            time: time()
        },
        {
            id: id(),
            title: makeText(5).trim(),
            post: makeText(100).trim(),
            name: makeText(5).trim(),
            url: 'http://asdasd.com',
            categories: [
                'Food',
                'Health'
            ],
            comments: [{
                    name: makeText(5).trim(),
                    comment: makeText(15).trim(),
                    time: time(),
                    rating: rating()
                },
                {
                    name: makeText(5).trim(),
                    comment: makeText(15).trim(),
                    time: time(),
                    rating: rating()
                },
            ],
            time: time()
        },
    ]
}

