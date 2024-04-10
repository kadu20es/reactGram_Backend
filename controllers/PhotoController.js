const Photo = require("../models/Photo")
const User = require("../models/User");

const mongoose = require("mongoose")

// Insert a photo, with an user related
const insertPhoto = async (req, res) => {
    const { title } = req.body
    const image = req.file.filename

    const reqUser = req.user
    console.log(reqUser)
    const user = await User.findById(reqUser._id)

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    // If photo was sucessfully created
    if (!newPhoto) {
        res.status(422).json({errors: ["Houve um problema. Por favor, tente novamente mais tarde."]})
        return
    }

    res.status(201).json(newPhoto)
}

// remove a photo from DB
const deletePhoto = async (req, res) => {

    console.log("Opa!")

    const { id } = req.params
    const reqUser = req.user

    console.log(id)

    try {
        console.log("hmmmm")
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id))
        console.log(photo)

        // check if photo exists
        if (!photo) {
            res.status(404).json({errors: ["Foto não encontrada"]})
            return
        }

        // check if photo belongs to user
        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({errors: ["ocorreu um erro. por favor, tente mais tarde."]})
            return
        }

        await Photo.findByIdAndDelete(photo._id)
        res.status(200).json({id: photo._id, message: "Foto excluída com sucesso."})
    } catch (error) {
        res.status(404).json({errors: ["Foto não encontrada"]})
    }

}

const getAllPhotos = async (req, res) => {
    //                                       -1 traz as últimas primeiro
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos)
}

const getUserPhotos = async (req, res) => {
    const {id} = req.params

    const photos = await Photo.find({userId: id})
        .sort([["createdAt", -1]])
        .exec()

        return res.status(201).json(photos)
}

const getPhotoById = async (req, res) => {
    const {id} = req.params

    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

    // check if photo exists
    if (!photo) {
        return res.status(404).json({errors: ["Foto não encontrada."]})
    }

    return res.status(200).json(photo)
}

const photoUpdate = async (req, res) => {
    const {id} = req.params
    const {title} = req.body
    console.log(title)

    const reqUser = req.user
    const photo = await Photo.findById(id)


    // check if photo exists
    if (!photo) {
        return res.status(404).json({errors: ["Foto não encontrada."]})
    }

    // check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
        return res.status(422).json({errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."]})
    }

    if (title) {
        photo.title = title
    }

    await photo.save()

    res.status(200).json({ photo, message: "Foto atualizada com sucesso."})


}

// liike funcionality
const likePhoto = async (req, res) => {

    const {id} = req.params
    const reqUser = req.user
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))
    console.log(photo.likes)

    if (!photo) {
        res.status(404).json({errors: ["Foto não encontrada"]})
        return
    }

    // check if user alrwady liked the photo
    if (photo.likes.includes(reqUser._id)) {
        res.status(422).json({errors: ["Você já curtiu a foto."]})
        return
    }

    // put user id in likes array
    photo.likes.push(reqUser._id)
    photo.save()
    res.status(200).json({photoId: id, userId: reqUser._id, message: "A foto foi curtida"})

}

const commentPhoto = async (req, res) => {
    const { id } = req.params
    const { comment } = req.body

    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    const photo = await Photo.findById(id)

    if (!photo) {
        res.status(404).json({errors: ["Foto não encontrada"]})
        return
    }


    // put the comment in the aeeay of comments
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: reqUser._id
    }

    photo.comments.push(userComment)

    await photo.save()

    res.status(200).json({
        comment: userComment,
        message: "O comentário foi adicionado com sucesso"
    })
}

const searchPhotos = async (req, res) => {
    const { q } = req.query
    const photos = await Photo.find({title: new RegExp(q, "i")}).exec()
    res.status(200).json(photos)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    photoUpdate,
    likePhoto,
    commentPhoto,
    searchPhotos
}
