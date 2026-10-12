import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

export interface SocialMedia {
    url: string,
    icon: IconDefinition
}

export const SocialMedias: SocialMedia[] =[
    {
        url: 'https://www.facebook.com/profile.php?id=100087275162694',
        icon: faFacebookF
    },
    {
        url: 'https://www.instagram.com/sinapsmed',
        icon: faInstagram
    }
]
