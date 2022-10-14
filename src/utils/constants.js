import facebook from '../images/sign/facebook.svg';
import google from '../images/sign/google.svg';
import apple from '../images/sign/apple.svg';

import navMain from '../images/navi/main.svg';
import navOrgs from '../images/navi/orgs.svg';
import navGov from '../images/navi/gov.svg';
import navOKPD from '../images/navi/okpd.svg';



export const signLogos = [
    {name: "Facebook", icon:facebook},
    {name: "Apple", icon: apple},
    {name: "Google", icon: google},
]

export const navigationMap = [
    {path: "/", title: "Главная", icon: navMain},
    // {path: "/company", title: "Организации", icon: navOrgs},
    // {path: "/govs", title: "Госзаказ", icon: navGov},
    // {path: "/okpd", title: "Товары", icon: navOKPD},
]

export const companiesList = [
    {inn: "1123521352", title: "ООО Ромашка", icon: google},
    {inn: "3453463453", title: "ООО Какашка", icon: google},
    {inn: "2342352352", title: "АО Газпром", icon: google},
    {inn: "3242342342", title: "Сбербанк", icon: google},
    {inn: "3242342342", title: "Сбербанк", icon: google},
]

export const govsList = [
    {inn: "1123521352", title: "ГБУ Инфогород", icon: google},
    {inn: "3242342342", title: "Управление Росздравнадзора по городу Москве и Московской области на странспорте", icon: google},
    {inn: "3453463453", title: "Роспотребнадзор", icon: google},
    {inn: "2342352352", title: "Минсельхоз", icon: google},
    {inn: "3242342342", title: "ФГУП Почта России", icon: google},
]

export function firstLetter(name) {
    return name ? Array.from(name)[0].toUpperCase() : '';
}

export const isActive = ({isActive}) => isActive ? 'active-link' : '';