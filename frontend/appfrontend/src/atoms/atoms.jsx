import {atom,selector} from "recoil";

export const useratom = atom({
    key : "useratom",
    default : 0
})

export const recieveratom = atom({
    key : "recieveratom",
    default : 0
})

export const messageatom = atom({
    key : "messageatom",
    default : 0
})

export const messagearrayatom = atom({
    key : "messagearrayatom",
    default : [{

    }]
})