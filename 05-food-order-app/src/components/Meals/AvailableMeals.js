import { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card.js";
const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      let response = await fetch(
        "https://react-test-78642-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      let data = await response.json();
      let mealData = [];
      for (var key in data) {
        mealData.push({
          id: key,
          key: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(mealData);
      setIsLoading(false)
    };
    fetchMeals().catch((error)=>{
      setHttpError(error.message)
      setIsLoading(false);
    })
    
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      price={meal.price}
      key={meal.id}
      name={meal.name}
      description={meal.description}
    />
  ));

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>LOADING..</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
