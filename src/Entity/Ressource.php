<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\RessourceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RessourceRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ["reservations.status" => "exact"])]
#[ApiResource(attributes: ['pagination_enabled' => false], normalizationContext: ['groups' => ['ressource']])]
class Ressource
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["reservation", "ressource"])]
    protected ?int $id;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups(["reservation", "ressource"])]
    private ?string $code;

    #[ORM\Column(type: 'float')]
    #[Groups(["reservation", "ressource"])]
    private ?float $price;

    #[ORM\Column(type: 'integer')]
    #[Groups(["reservation", "ressource"])]
    private ?int $capacity;

    #[ORM\OneToMany(mappedBy: 'ressource', targetEntity: Reservation::class)]
    #[Groups(["ressource"])]
    private Collection $reservations;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): self
    {
        $this->capacity = $capacity;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): self
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations[] = $reservation;
            $reservation->setRessource($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getRessource() === $this) {
                $reservation->setRessource(null);
            }
        }

        return $this;
    }
}
