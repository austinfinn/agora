async function create(req,res){
    try {
        res.send("hello")
    } catch (error) {
        console.log(error)
    }
}
module.exports = create