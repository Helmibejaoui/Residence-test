<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ReservationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['reservation']])]
#[ApiFilter(SearchFilter::class, properties: ["startAt" => "exact", "status" => "exact"])]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["reservation", "ressource"])]
    protected ?int $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["reservation", "ressource"])]
    private ?string $status;

    #[ORM\Column(type: 'integer')]
    #[Groups(["reservation", "ressource"])]
    private ?string $cin;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["reservation", "ressource"])]
    private ?string $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["reservation", "ressource"])]
    private ?string $lastname;

    #[ORM\Column(type: 'float')]
    #[Groups(["reservation", "ressource"])]
    private ?float $payment;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["reservation", "ressource"])]
    private ?string $type;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(["reservation", "ressource"])]
    private ?string $advance;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(["reservation", "ressource"])]
    private ?\DateTimeInterface $dataAdvance;

    #[ORM\Column(type: 'date')]
    #[Groups(["reservation", "ressource"])]
    private ?\DateTimeInterface $startAt;

    #[ORM\Column(type: 'date')]
    #[Groups(["reservation", "ressource"])]
    private ?\DateTimeInterface $endAt;

    #[ORM\ManyToOne(targetEntity: Ressource::class, inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups("reservation")]
    #[ApiSubresource]
    private ?Ressource $ressource;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCin(): ?int
    {
        return $this->cin;
    }

    public function setCin(int $cin): self
    {
        $this->cin = $cin;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getPayment(): ?float
    {
        return $this->payment;
    }

    public function setPayment(float $payment): self
    {
        $this->payment = $payment;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getAdvance(): ?float
    {
        return $this->advance;
    }

    public function setAdvance(float $advance): self
    {
        $this->advance = $advance;

        return $this;
    }

    public function getDataAdvance(): ?\DateTimeInterface
    {
        return $this->dataAdvance;
    }

    public function setDataAdvance(\DateTimeInterface $dataAdvance): self
    {
        $this->dataAdvance = $dataAdvance;

        return $this;
    }

    public function getStartAt(): ?\DateTimeInterface
    {
        return $this->startAt;
    }

    public function setStartAt(\DateTimeInterface $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getEndAt(): ?\DateTimeInterface
    {
        return $this->endAt;
    }

    public function setEndAt(\DateTimeInterface $endAt): self
    {
        $this->endAt = $endAt;

        return $this;
    }

    public function getRessource(): ?Ressource
    {
        return $this->ressource;
    }

    public function setRessource(?Ressource $ressource): self
    {
        $this->ressource = $ressource;

        return $this;
    }
}
