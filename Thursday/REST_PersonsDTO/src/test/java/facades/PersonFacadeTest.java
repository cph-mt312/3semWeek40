package facades;

import dto.PersonDTO;
import dto.PersonsDTO;
import entities.Address;
import utils.EMF_Creator;
import entities.Person;
import exceptions.PersonNotFoundException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

//Uncomment the line below, to temporarily disable this test
//@Disabled
public class PersonFacadeTest {

    private static EntityManagerFactory emf;
    private static PersonFacade facade;
    private static Person p1, p2;
    private static Address a1, a2;

    public PersonFacadeTest() {
    }

    @BeforeAll
    public static void setUpClass() {
        emf = EMF_Creator.createEntityManagerFactoryForTest();
        facade = PersonFacade.getPersonFacade(emf);
    }

    @AfterAll
    public static void tearDownClass() {
//        Clean up database after test is done or use a persistence unit with drop-and-create to start up clean on every test
    }

    // Setup the DataBase in a known state BEFORE EACH TEST
    //TODO -- Make sure to change the script below to use YOUR OWN entity class
    @BeforeEach
    public void setUp() {
        EntityManager em = emf.createEntityManager();
        a1 = new Address("South Crescent 26", "4270", "Winster");
        a2 = new Address("Nith Street 84", "1075", "Glasgow");
        p1 = new Person("Harry", "Potter", "11223344", a1);
        p2 = new Person("Hermione", "Granger", "55667788", a2);
        try {
            em.getTransaction().begin();
            em.createNamedQuery("Person.deleteAllRows").executeUpdate();
            em.persist(p1);
            em.persist(p2);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    @AfterEach
    public void tearDown() {
//        Remove any data after each test was run
    }

    @Test
    public void testGetPersonCount() {
        assertEquals(2, facade.getPersonCount(), "Expects two rows in the database");
    }

    @Test
    public void testGetPerson() throws PersonNotFoundException {
        PersonDTO personDTO = facade.getPerson(p1.getId());
        assertEquals(p1.getfName(), personDTO.getfName());
    }

    @Test
    public void testAddPerson() {
        facade.addPerson("Albus", "Dumbledore", "88447711", "Temple Way 3", "9281", "Witley");
        assertEquals(3, facade.getPersonCount());
    }

    @Test
    public void testDeletePerson() throws PersonNotFoundException {
        facade.deletePerson(p1.getId());
        assertEquals(1, facade.getPersonCount());
    }

    @Test
    public void testEditPerson() throws PersonNotFoundException {
        PersonDTO personDTO = new PersonDTO(p2);
        personDTO.setlName("Potter");
        facade.editPerson(personDTO);
        PersonDTO editedPersonDTO = facade.getPerson(p2.getId());
        assertTrue(editedPersonDTO.getlName().equals("Potter"));
    }
}