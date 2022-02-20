import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "kdq958m0",
  dataset: "production",
  apiVersion: "1",
  token:
    "skTyyP8Rqh12IjH74Rupk0L8esUbeAjZ0idmMm7Wl3iy6l8Cokm3onDZeiwNNN6uEFv2WvRegw1wIwnVdDezRzrbH58frPqV4rFoARtUAa08L288gRGA51njF9nDygj0QU0KAbJjJmz7U0fJXh6Jc020lmRpNueiD31F01XOjZ8XTBwfzuv3",
  useCdn: false,
});
