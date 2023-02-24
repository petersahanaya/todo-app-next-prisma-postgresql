import { NextApiHandler } from "next"
import prisma from "@prisma"

const LikeHandler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        const { userId, postId } = req.body as { userId: string, postId: string }

        const finded = await prisma.like.findFirst({ where: { postId, userId } })

        if (finded) {
            await prisma.like.delete({where : {id : finded.id}})
            return res.json({ msg: "Unliked.." })
        }

        await prisma.like.create({
            data: {
                Post: { connect: { id: postId } },
                WhoLike: { connect: { id: userId } }
            }
        })

        return res.json({ msg: "User Liked Successfully" })
    }
}

export default LikeHandler