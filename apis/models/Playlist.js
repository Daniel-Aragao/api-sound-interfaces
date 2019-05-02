module.exports = class Playlist {
  constructor(id, name, user_id) {
    this.id = id;
    this.name = name;
    this.user_id = user_id;
    this._tracks = [];
  }

  addTrack(track) {
    this._tracks.push(track);
  }

  containsTrack(trackId){
    return this._tracks.findIndex(track => track.id === trackId) > -1;
  }

  removeTrack(trackId) {
    const index = this._tracks.findIndex(track => track.id === trackId);
    if (index >= 0) {
      this._tracks.splice(index, 1);
    }
  }
}