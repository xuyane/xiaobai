import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(musicData) {
  // console.log(musicData.songid)
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    url: `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=9515647680&vkey=E131A5B6ABC31074FA7CD6674ECFEB0DA16064F87611192EEFB7D37B7296F4B16224E0BBC6E0AC3134F7C6FC463B42299F7AA8DEA9AB2C3B&uin=0&fromtag=38`
  })
}


function filterSinger(singer) {
  let ret = [];
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name);
  });
  return ret.join('/')
}