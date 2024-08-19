const linkHandler = (router, id) => {
    router.push({ name: 'tender-detail', params: { id: id } })
}

export default linkHandler;