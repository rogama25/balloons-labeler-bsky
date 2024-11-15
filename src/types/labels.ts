import {LabelValueDefinitionStrings} from "@atproto/api/dist/client/types/com/atproto/label/defs.js";

export type Label = {
    id: string,
    locales: LabelValueDefinitionStrings[],
    startDays: number,
    endDays: number
}