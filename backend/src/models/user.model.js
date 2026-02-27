export class User{
    constructor ({id, email, password, latitude, longitude, is_verified}){
        this.id = id;
        this.email = email;
        this.password = password;
        this.latitude =latitude;
        this.longitude = longitude;
        this.is_verified = is_verified;
    }
}