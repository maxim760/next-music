import { fetchTracks } from "../store/actions/track";
import axios from "axios"
import { IComment } from "../types/track";
const path = `${process.env.basePath}track`
type IComToServer = Omit<IComment, "_id"> & {track: string}
export const TrackApi = {
  async fetchTracks() {
    const res = await axios.get(path)
    return res.data
  },
  async searchTracks(query: string) {
    console.log(query)
    const res = await axios.get(path + `/search?query=${query}`)
    return res.data
  },
  async create(data: FormData) {
    return await axios.post(path, data)
  },
  async remove(id: string) {
    return await axios.delete(path + "/" + id)
  },
  async getOne(id: string) {
    const track = await axios.get(path + "/" + id)
    return track.data
  },

  async addComment(comment: IComToServer) {
    return await axios.post(path + "/comment", comment)
  },
  async addListen(id: string) {
    return await axios.post(path + "/listen/" + id)
  }
}