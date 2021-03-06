Template.search.helpers({
  places: function () {
    var query = Router.current().params.query;
    var searched = query.searched;
    if (searched === undefined) {
      searched = decodeURI(Router.current().params.searched);
    }
    if (searched === 'undefined' && Session.get('here') !== 'undefined') {
      var here = Session.get('here');
      return Places.find({loc: { $near: { $geometry: { type:"Point", coordinates:[here.lon, here.lat]}}, $maxDistance: 3000} }).fetch();
    }
    if (searched !== 'undefined') {
      return Places.find({$or: [{placename: { $regex: searched, $options: 'i' }}, {phone: { $regex: searched, $options: 'i' }}, {street: { $regex: searched, $options: 'i' }}, {town: { $regex: searched, $options: 'i' }}, {zip: { $regex: searched, $options: 'i' }}, {placedesc: { $regex: searched, $options: 'i' }}, {PlacesTags: { $regex: searched, $options: 'i' }}, {code: { $regex: searched, $options: 'i' }}]}).fetch();
    }
  }
});
