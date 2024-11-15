import {LoginCredentials, setLabelerLabelDefinitions} from "@skyware/labeler/scripts";
import {labels} from "./constants/labels.js";
import {ComAtprotoLabelDefs} from "@atproto/api";
import 'dotenv/config'

const loginCredentials: LoginCredentials = {
    identifier: process.env.USER || "",
    password: process.env.PASSWORD || "",
}

const labelDefinitions: ComAtprotoLabelDefs.LabelValueDefinition[] = [];

for (const label of labels) {
    const labelValueDefinition: ComAtprotoLabelDefs.LabelValueDefinition = {
        identifier: label.id,
        severity: 'inform',
        blurs: 'none',
        defaultSetting: 'warn',
        adultOnly: false,
        locales: label.locales,
    };

    labelDefinitions.push(labelValueDefinition);
}

try {
    await setLabelerLabelDefinitions(loginCredentials, labelDefinitions);
    console.info('Label definitions set successfully.');
} catch (error) {
    console.error(`Error setting label definitions: ${error}`);
}