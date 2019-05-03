module.exports = class Playlist {
  constructor(id, name, user_id) {
    this.id = id;
    this.name = name;
    this.user_id = user_id;
    this.tracks = [];
  }

  addTrack(track) {
    this.tracks.push(track);
  }

  containsTrack(trackId){
    return this.tracks.findIndex(track => track.id === trackId) > -1;
  }

  removeTrack(trackId) {
    const index = this.tracks.findIndex(track => track.id === trackId);
    if (index >= 0) {
      this.tracks.splice(index, 1);
    }
  }
}