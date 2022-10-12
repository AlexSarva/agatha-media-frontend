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

export const myGraphData = {
    nodes: [
        { id: 1, label: "Node 1", color: "#e04141" },
        { id: 2, label: "Node 2", color: "#e09c41" },
        { id: 3, label: "Node 3", color: "#e0df41" },
        { id: 4, label: "Node 4", color: "#7be041" },
        { id: 5, label: "Node 5", color: "#41e0c9" }
    ],
    edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
    ]
}