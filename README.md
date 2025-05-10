# Motivation
Inkwell is designed to allow clinicians to quickly develop data collection forms for research or audit. Unlike tools such as Google Forms, Survey Monkey etc, data is kept secure by *never being uploaded to a server*.

All code is executed client-side, with responses saved as a per-subject CSV file. The intention is that this file is then emailed to the study organiser via secure NHS mail, who may then collate responses.

# Current State
The project is currently in proof of concept phase. It is not yet intended for use in clinical work. 

# Future development
We intend that Inkwell will be expanded rapidly. There are many features we're keen to add, including:
* A greater variety of question types
* Ability to save partial responses; multi-user responses including senior sign-off
* User-friendly collection form design (drag and drop UI). For now, studies must be manually defined using JSON. Please see below for documentation of the expected format

# Study
This root object defines the properties of the entire study. 
## Supported Fields 
| Field       | Required | Notes |
|-------------|----------|-------|
| `name_short`      | yes      | The name of the study. This must be unique|
| `name_full` | no       | The long display name of the study. This need not be specified; if specified it does not need to be unique. |
| `contact`   | yes      | The contact details of the study organiser - `name` and `email` |
| `pages`     | yes      |  An array of `Page` objects |
| `responseID_field` | no | If a valid question key is specified, the response to that question will be used as the responseID. If not, a random UUID (v4) will be used. |
| `options`   | no       | Configuration options      |

## Configuration options
| Field       | Notes |
|-------------|-------|
| `hidden_question_placeholder`| Responses to hidden branch questions will be replaced to this string. If not specified, defaults to `N/A` |


# Page
This object acts as a collection of `Question` objects, to be displayed together. 
| Field       | Required | Notes |
| ----------- | ---------|-------|
| `prompt`    | no      | Text to display to the user in the top left of the page. This need not be unique or specified at all.|
| `id`        | yes      | The unique ID for the question, generated as a UUID v4. |
| `questions` | yes     | An array of `Question` objects |

# Question 
This type defines a single question that forms part of the study.
## Supported Fields 
| Field       | Required | Notes |
| ----------- | ---------|-------|
| `prompt`    | yes      | The question text to display to the user. This need not be unique.|
| `id`        | yes      | The unique ID for the question, generated as a UUID v4. |
| `type`      | yes      | The type of question. This will affect the allowed values, as well as the displayed control. See below for options. |
| `mandatory` | no       | If set to `true`, indicates the question *must* be answered (non-nullish answer); the form will not submit without it. Use sparingly! |
| `default`   | no       | A default value for the question. If not set, the response will be set to an empty string |
| `options`   | no       | For questions of type `select`, sets the allowed options. Specify as an array of type `string`, or specify a predefined options list (see below).
| `depends-on`| no       | Specifies the dependency for branches (questions that will only be displayed if the value of another question matches a certain value). See below for format.|

##  `type` options
### `string`
A simple text entry, intended for a single line. 

> Example uses:
>  * Name of the person filling out the report
>  * The patient's favourite film

### `text`
A longer text entry, intended for multiple lines.

> Use for longer freetext, such as:
>  * Past medical history
>  * Summary of clinical presentation

### `number`
Input a number. This could be an integer or a decimal, but the control will default to step increments of 1.

> Example uses:
>  * Number of seizures observed
>  * Individual lab results e.g. potassium level

### `temperature`
Essentially the same as `number`, but the step increment for the control is set to 0.1. The control will still accept additional decimal places, if typed in by the use.

### `date`
A date without a specified time
#### `default` field:
* Format as `yyyy-MM-dd` 
* Can also specify `'today'` to set to the date the report is started 

TODO: implement 'today'

> Example uses:
> * Date of presentation
> * Date of last followup

### `select`
#### `options` field
* To use a custom list, specify a string array e.g.  
    ```['inpatient', 'outpatient', 'other']```
* You may also use a predefined options list. Current values are:
  * `'yes-no'`
  * `'nhs-trust'`

TODO: implement predefined list options

## Branch questions (`depends-on`)

To set a questions as a branch question, use the `depends-on` field. This should consist of the `id` of the parent question, and the `value` which, if matched, will result in the branch question being displayed. 

Note that, in principal, a branch question can precede the question it depends upon. This is strongly discouraged, as it is highly likely to result in the user missing the branch question. It is encouraged to only use branch questions directly after the parent question.

TODO: Branch pages (not currently implemented)