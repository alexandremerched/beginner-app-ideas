const getData = async () => {
    return await fetch('https://www.githubstatus.com?format=json')
        .then(res => res.json())
        .then(data => {
            return data
        })
}

export default getData