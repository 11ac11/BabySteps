import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
// import { Confirmation } from '../Confirmation/Confirmation';
import { Budle } from '../Budle/Budle'
import { addAges } from '../../utils/addAgeToStep';


export default function Timeline({
  userId,
  created,
  setCreated,
  babyName,
  babyId,
  babyBirth,
}: {
  userId: string;
  created: boolean;
  setCreated: any;
  babyName: string;
  babyBirth: any;
  babyId: string;
  }){
  const [steps, setSteps] = useState([]);
// update to get all steps for a baby and sort by date

  useEffect(() => {
    async function getData() {
      const stepsRef = doc(db, 'users', userId, 'babies', babyId)

      const response: any = await getDoc(stepsRef);
      console.log(response.data())
      return response.data().steps.map((doc: { data: () => { (): any; new(): any; steps: any[]; }; }) => {
        // console.log('this is doc: ', doc.data().steps[0])
        return doc;
      });
    }
    setCreated(false);
    getData()
      .then((result: any) => setSteps(addAges(result, babyBirth)))
      .then(() => console.log('im being run again on timeline'));
  }, [userId, created, setCreated, babyBirth]);

  const budles: any = [];

  for (let i = 0; i < steps.length; i++) {
    if (budles.findIndex((budle: any) => budle.age === steps[i]['age']) >= 0) {
      const index = budles.findIndex((budle: any) => budle.age === steps[i]['age']);
      budles[index].steps.push(steps[i]);
    } else {
      const newStep = { age: steps[i]['age'], steps: [] };
      newStep.steps.push(steps[i]);
      budles.push(newStep);
    }
  }

  budles.sort((a: any, b: any) => a.age - b.age);

  return (
    <>
      {steps.length === 0 ? (
        <p></p>
        // <Confirmation babyName={babyName} />
      ) : (
        budles.map((budle: any, index:number) => <Budle budle={budle} key={index} />)
      )}
    </>
  );
}
