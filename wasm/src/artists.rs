use serde_derive::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Artist { // using camelCase instead of snake_case due to the API
    pub strArtist: String,
    pub intFormedYear: String,
    pub strBiographyEN: String,
    pub strGenre: String,
    pub intMembers: String
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ArtistInfo {
    pub(crate) artists: Vec<Artist>,
}
