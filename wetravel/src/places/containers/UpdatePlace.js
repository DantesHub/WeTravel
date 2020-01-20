import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/util/validator";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hooks";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous buildings ever created",
    imageUrl:
      "https://images.unsplash.com/photo-1502104034360-73176bb1e92e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484,
      lng: -73.9857
    },
    creator: "u1"
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous buildings ever created",
    imageUrl:
      "https://images.unsplash.com/photo-1502104034360-73176bb1e92e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484,
      lng: 73.9857
    },
    creator: "u2"
  }
];

const UpdatePlace = props => {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='center'>
        <h2>Dloading..</h2>
      </div>
    );
  }

  return (
    //defer returning this until we actually have some data

    <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        errorText='please enter a valid title.'
        onInput={inputHandler}
        //INITIAL VALUE && ISVALID
        value={formState.inputs.title.value}
        validators={[VALIDATOR_REQUIRE()]}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        errorText='please enter a valid description.'
        onInput={inputHandler}
        //INITIAL VALUE && ISVALID
        value={formState.inputs.description.value}
        validators={[VALIDATOR_MINLENGTH(5)]}
        valid={formState.inputs.description.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
